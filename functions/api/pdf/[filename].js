// Pages Function: GET /api/pdf/:filename
// 从 R2 获取 PDF 文件

export async function onRequestGet(context) {
  const { filename } = context.params
  const { R2 } = context.env

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const object = await R2.get(filename)
    if (!object) {
      return new Response('File not found', { status: 404, headers: corsHeaders })
    }

    return new Response(object.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (err) {
    return new Response('Internal error', { status: 500, headers: corsHeaders })
  }
}

export function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
