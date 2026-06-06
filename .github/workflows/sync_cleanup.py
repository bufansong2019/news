import json, os, sys, urllib.request, urllib.parse

account_id = os.environ['CLOUDFLARE_ACCOUNT_ID']
token = os.environ['CLOUDFLARE_API_TOKEN']
base = f'https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets/public-bucket/objects'

req = urllib.request.Request(base, headers={'Authorization': f'Bearer {token}'})
with urllib.request.urlopen(req) as r:
    data = json.load(r)

if not data.get('success'):
    sys.exit(1)

local = {f for f in os.listdir('src/contents/pdfs') if f.endswith('.pdf')}

for obj in data['result']:
    key = obj['key']
    if not key.startswith('news/'):
        continue
    name = key.split('news/', 1)[1]
    if name == 'resources.json':
        continue
    if name not in local:
        print(f'Deleting: {name}')
        encoded = urllib.parse.quote(key, safe='')
        req = urllib.request.Request(f'{base}/{encoded}', method='DELETE',
            headers={'Authorization': f'Bearer {token}'})
        urllib.request.urlopen(req)
