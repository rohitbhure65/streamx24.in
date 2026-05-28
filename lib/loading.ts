export default async function getData() {
    await new Promise((resolve) => setTimeout(resolve, 3000)) // 3 sec delay
    return { message: "Hello" }
}

// const data = await getData()
