import axios from "axios";
import parse from 'html-react-parser';

export default async function (name) {
  try {
    const { data } = await axios.get(`https://api.multiavatar.com/${name}.svg`);
    return data
  } catch (e) {
    console.log(e);
    throw e;
  }
}
