import json, os, subprocess, datetime

meta_path = 'src/contents/pdfs/meta.json'
if not os.path.exists(meta_path):
    print('meta.json not found, skipping')
    exit(0)

with open(meta_path, encoding='utf-8') as f:
    meta = json.load(f)

resources = []
for filename, info in meta.items():
    filepath = os.path.join('src/contents/pdfs', filename)
    if not os.path.exists(filepath):
        print(f'Warning: {filename} in meta.json but not found on disk')
        continue

    size_bytes = os.path.getsize(filepath)
    if size_bytes < 1024 * 1024:
        size = f'{size_bytes / 1024:.1f}KB'.replace('.0', '')
    else:
        size = f'{size_bytes / (1024 * 1024):.1f}MB'.replace('.0', '')

    try:
        result = subprocess.run(
            ['git', 'log', '--follow', '--format=%as', '--', filepath],
            capture_output=True, text=True, cwd='.', timeout=10
        )
        lines = [l for l in result.stdout.strip().split('\n') if l]
        datestr = lines[-1] if lines else datetime.date.today().isoformat()
    except Exception:
        datestr = datetime.date.today().isoformat()

    rid = filename.replace('.pdf', '')

    resources.append({
        'id': rid,
        'title': info['title'],
        'category': info['category'],
        'filename': filename,
        'size': size,
        'date': datestr,
    })

resources.sort(key=lambda r: r['date'], reverse=True)

with open('resources.json', 'w', encoding='utf-8') as f:
    json.dump(resources, f, ensure_ascii=False, indent=2)

print(f'Generated resources.json with {len(resources)} entries')
