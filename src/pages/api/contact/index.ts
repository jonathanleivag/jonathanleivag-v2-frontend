import type {APIRoute} from 'astro'
import type {IFormInput, Res} from "../../../type";
import {getENV} from "../../../utils/env.util.ts";
import {ENV} from "../../../enum.ts";

export const prerender = false;

export const POST: APIRoute = async ({request}) => {
    try {
        const body = await request.json() as IFormInput

        const response = await fetch(
            `${getENV(ENV.API_URL)}/contact/send/email`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            throw new Error('Error occurred')
        }

        const data = (await response.json()) as Res<any>

        if (data.error !== null) {
            throw new Error(data.error)
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
