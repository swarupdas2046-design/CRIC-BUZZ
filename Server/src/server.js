import CreateApp from "./app.js";

const app =   CreateApp()

function StartServer(){
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}

StartServer()