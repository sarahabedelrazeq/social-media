import { history } from "helpers";

export default function navigate(path, ...options) {
  history.push({ pathname: path, ...options[0] });
}
