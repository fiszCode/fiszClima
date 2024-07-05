export default async function NewsAPI(req, res) {

	const URL = `https://buenosaires.gob.ar/subtes`
	const json = await fetch(URL).then(r => r.json())

	res.status(200).json(json);
}