export default function possiblyGetToken(cookies, setCookie, setToken) {
  const fetchData = async () => {
    const response = await fetch("https://api.kremen.org.ua/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "grant_type=client_credentials&scope=basic&client_id=cnapkremen&client_secret=RA2ktB4y9ryHyr9RHDHTY6hksk5S3nnEKaQ5BEkATG6bY5Tsyr8dff"
    });

    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // Do not fetch every time, only when token expires!
  if (!cookies["token"]) {
    fetchData()
      .then((res) => {
        setToken(res.access_token);
        // calculating expires
        const now = new Date(),
          time = now.getTime(),
          expireTime = time + res.expires_in;
        now.setTime(expireTime);
        setCookie("token", res.access_token, {
          path: "/",
          expires: now
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    // If cookies exist - update state with this token and use it in whole app through the context
    setToken(cookies["token"]);
  }
}
