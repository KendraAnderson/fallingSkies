//Connect to nasa's API
import { convertToJson } from "./utils";
const api_key = "K2Jb0JsuuypmVqpf8TxkBxcHhrlkHvCWRuC0z1tc";
const apiURL = "https://ssd-api.jpl.nasa.gov/fireball.api"

export default class ConnectToNasa{
    async getData(){
        return await fetch(`${apiURL}&api_key=${api_key}`)
        .then(res=>convertToJson(res))
    }
}

