import { FC } from "hono/jsx"
const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link href="/static/main.css" rel="stylesheet" /> */}
      </head>
      <body class="bg-black text-green-300">{props.children}</body>
    </html>
  )
}

export default Layout;
