-- example HTTP POST script which demonstrates setting the
-- HTTP method, body, and adding a header

wrk.method = "POST"
wrk.headers["Content-Type"] = "application/json"

counter = 0

request = function()
    wrk.body   = '{"query":"query { author(id: ' .. counter .. ') { id firstName lastName posts {id title votes}}}"}'
    counter = counter + 1
    return wrk.format()
end