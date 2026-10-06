//pool faz a conexão com a lib do postgre
import { Pool } from 'pg'// se pg "reclamar" instale via terminal: yarn add @types/pg -D
import { Kysely, PostgresDialect } from 'kysely'

//as tabelas no Supabase usa snake_case (caixa baixa com underscore)
//camel_Case é o padrão correto para TS e JS (atenção a essa diferença e tipagem)
interface Database {
    missions: {
        id: string,
        rocket: string,
        base_id: string,
        departure_date: string,
        return_date: string,
        price: number
    }
    reservations: {
        mission_id: string
    }
    tickets: {
        mission_id: string
    }
}

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,//credenciais no arquivo .env (não versionado)
        ssl: { rejectUnauthorized: false }//evita problemas de conexão em várias situações (ip, localização, VPN, etc)
    })
})

//exporta o db que vai ser um objeto Kysley qyue fará conexões com o banco
export const db = new Kysely<Database>({
    dialect,
})

export async function insertMission(id: string) {
    await db
        .insertInto('missions')//seguir o contrato
        .values({
            id,
            rocket: 'Starship',
            base_id: 'aurora',
            departure_date: '2028-01-20',
            return_date: '2028-01-27',
            price: 1000.00
        })
        .execute()
}

export async function deleteMission(id: string) {
    await db
        .deleteFrom('missions')
        .where('id', '=', id)
        .execute()
}

export async function deleteReservation(mission_id: string) {
    await db
        .deleteFrom('reservations')
        .where('mission_id', '=', mission_id)
        .execute()
}

export async function deleteTicket(mission_id: string) {
    await db
        .deleteFrom('tickets')
        .where('mission_id', '=', mission_id)
        .execute()
}