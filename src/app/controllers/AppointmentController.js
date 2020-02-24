import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Notification from '../schemas/Notification';

class AppointmentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const appointment = await Appointment.findAll({
            where: {
                user_id: req.userID,
                canceled_at: null,
            },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        return res.json(appointment);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = req.body;

        /**
         * Check if provider_id is a provider
         */
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({
                error: 'You can only create appointments with providers',
            });
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        /**
         * Check date availability
         */

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Appointment date is not available' });
        }

        const appointment = await Appointment.create({
            user_id: req.userID,
            provider_id,
            date: hourStart,
        });

        /**
         * Notify appointment provider
         */

        const user = await User.findByPk(req.userID);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:MM'h'",
            { locale: pt }
        );

        await Notification.create({
            content: `Novo adendamento de ${user.name} para o ${formattedDate}`,
            user: provider_id,
        });

        return res.json(appointment);
    }
}
export default new AppointmentController();