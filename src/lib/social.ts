export async function postToThreads(text: string, hashtags: string[] = []) {
  const userId = process.env.THREADS_USER_ID;
  const token = process.env.THREADS_ACCESS_TOKEN;

  const createRes = await fetch(
    `https://graph.threads.net/v1.0/${userId}/threads`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'TEXT',
        text: `${text}\n\n${hashtags.join(' ')}`,
        access_token: token,
      }),
    }
  );
  const { id: containerId } = await createRes.json();

  const publishRes = await fetch(
    `https://graph.threads.net/v1.0/${userId}/threads_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: containerId,
        access_token: token,
      }),
    }
  );
  const data = await publishRes.json();
  if (data.error) throw new Error(data.error.message);

  return { id: data.id, url: `https://www.threads.net/@${process.env.THREADS_USERNAME}/post/${data.id}` };
}
