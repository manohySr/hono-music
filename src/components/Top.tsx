import { FC } from "hono/jsx";
import Layout from "./Layout";

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <ul>
        {
          props.messages.map((message) => {
            return <li>{message}!! </li>
          })
        }
      </ul>
    </Layout>
  )
}

export default Top;
