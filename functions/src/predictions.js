import axios from 'axios'

const res = (cb, statusCode = 400, body = 'Error') => cb(null, { statusCode, body: JSON.stringify(body) })

exports.handler = function(event, context, cb) {
  return res(cb, 200, [{"score_one":1,"score_two":0,"user":{"id":"2bbbe8e3-46b7-4a37-96a9-2f41d8878ea1","name":"Trys"},"fixture":{"id":1,"team_one":{"id":1,"name":"England","slug":"england","group":"c"},"team_two":{"id":2,"name":"France","slug":"france","group":"c"},"score_one":null,"score_two":null,"final_score":null,"date":"2018-07-02T11:00:00"},"points":null}])
}
