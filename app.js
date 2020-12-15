const child = require("child_process");
const yargs = require("yargs");
const argv = yargs.command(
    "acceso",
    "Servidor levantado", {
        key: {
            describe: "Clave secreta",
            demand: true,
            alias: "k",
        },
    },
    (args) => {
        args.key == "123" ?
            child.exec("npm run start") :
            console.log("Clave incorrecta");
    }
).help().argv;