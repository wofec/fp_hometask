import { Image, User, Account } from '../../types';
import { Row } from 'src/components';

const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
	const rows = users.map((user) => {
		const userId = user.userID;

		const acc = accounts.find((acc) => acc.userID === userId);
		const image = images.find((img) => img.userID === userId);

		const [lastPayment] = acc.payments.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			avatar: image.url,
			username: user.username,
			country: user.country,
			name: user.name,
			lastPayments: lastPayment?.totalSum ?? 0,
			posts: acc.posts,
		}
	})

  return rows;
};

export default dataConverter;