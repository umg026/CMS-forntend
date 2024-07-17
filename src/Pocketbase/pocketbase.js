import PocketBase from "pocketbase"

// export const pb = new PocketBase("https://cms.3m3.in") // Production connection
export const pb = new PocketBase("http://192.168.1.116:8090") // Development connection

pb.autoCancellation(false)
export default pb;