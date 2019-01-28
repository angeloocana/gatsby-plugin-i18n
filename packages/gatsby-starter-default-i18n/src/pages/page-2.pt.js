import React from 'react'
import Link from 'gatsby-link'
import Layout from "../layouts/pt"

const SecondPage = (props) => (
  <Layout location={props.location}>
    <div>
      <h1>Oi da segunda pagina!</h1>
      <p>Bem viando a pagina 2</p>
      <Link to="/pt/">Voltar pro início</Link>
    </div>
  </Layout>
)

export default SecondPage
