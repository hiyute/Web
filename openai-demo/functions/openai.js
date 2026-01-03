exports.handler = async (event) => 
{
if (event.httpMethod !== "POST") return {statusCode: 405};
const { msg } = JSON.parse(event.body);
const rsp = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model: "gpt-4o-mini",
messages: [{role: "user", content: msg}]
})
});

const data = await rsp.json();
return {
statusCode: 200,
body: JSON.stringify({reply: data.choices[0].message.content})
};
};
