import { redirect } from "react-router";

export function loader() {
  return redirect("/buy-coffee", 301);
}
