import type {APIRoute, GetStaticPaths} from 'astro'
import {ROUTER_WITHOUT_LANGUAGE} from '../../../../enum'
import type {Res} from '../../../../type'

export const GET: APIRoute = async ({ params }) => {
  try {
    const { router } = params

    if (router === undefined) {
      throw new Error('Router or language is not defined')
    }

    const response = await fetch(`https://api.jonathanleivag.cl/api/${router}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error occurred')
    }

    const data = (await response.json()) as Res<any>

    if (data.error !== null) {
      throw new Error(data.error)
    }

    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Error occurred')
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return [
    { params: { router: ROUTER_WITHOUT_LANGUAGE.social } },
    { params: { router: ROUTER_WITHOUT_LANGUAGE.project } }
  ]
}
