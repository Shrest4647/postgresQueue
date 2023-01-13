curl -X POST -H 'Content-Type: application/json' -d '{
  "title": "Pizza",
  "price": 10.5
}' http://localhost:3001/add

# get all ads (including the one that you just added)
curl http://localhost:3001/

