import type {APIRoute} from 'astro'
import type {Pagination} from '../../../type'

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(
      `https://apiblog.jonathanleivag.cl/blog?page=1&limit=3&published=true&popular=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Error occurred')
    }

    const data = (await response.json()) as Pagination<any>

    if (data.message !== undefined) {
      throw new Error(data.message)
    }

    return new Response(JSON.stringify(data), {
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
