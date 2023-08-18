
const baseApiUrl = import.meta.env.VITE_APP_BASE_API

export async function verifyAccessToken(){
  if(localStorage.getItem('token')){
    const res = await fetch(baseApiUrl + "/validate-access", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: JSON.parse(localStorage.getItem('token') as string),
      }),
    })
    if (res.ok){
      return true
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      return false
    }
  }
}