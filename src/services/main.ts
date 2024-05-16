import slugify from "slugify"

async function main() {
    const title= "Garzón más cinco"

    const slug= slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })

    console.log("slug is: ", slug)

}

main()