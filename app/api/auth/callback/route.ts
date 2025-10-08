import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 })
    }

    // Create the auth message for Decap CMS
    const authMessage = JSON.stringify({
      token: tokenData.access_token,
      provider: 'github'
    })

    // Return success page with token for CMS
    const html = `<!DOCTYPE html>
<html>
  <head>
    <title>GitHub Authentication Successful</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        color: white;
      }
      .success-container {
        text-align: center;
        background: rgba(255,255,255,0.1);
        padding: 3rem;
        border-radius: 15px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      }
      .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
      h1 {
        margin: 1rem 0;
        font-size: 2rem;
        font-weight: 600;
      }
      p {
        margin: 1rem 0;
        font-size: 1.1rem;
        opacity: 0.9;
      }
      .loading {
        margin-top: 2rem;
      }
      .spinner {
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="success-container">
      <div class="success-icon">✅</div>
      <h1>GitHub Authentication Successful!</h1>
      <p>You have successfully logged in with GitHub.</p>
      <p>Redirecting you to the CMS dashboard...</p>
      <div class="loading">
        <div class="spinner"></div>
      </div>
    </div>
    <script>
      (function() {
        // Store the auth token in the format Decap CMS expects
        const authData = {
          token: '${tokenData.access_token}',
          provider: 'github'
        };
        
        // Store in localStorage with the exact key Decap CMS looks for
        localStorage.setItem('netlify-cms-user', JSON.stringify({
          login: 'authenticated',
          token: '${tokenData.access_token}',
          backendName: 'github'
        }));
        
        // Also store in the decap format for compatibility
        localStorage.setItem('decap-cms-user', JSON.stringify({
          login: 'authenticated', 
          token: '${tokenData.access_token}',
          backendName: 'github'
        }));
        
        // Automatically redirect to admin CMS with Documentation collection after 2 seconds
        setTimeout(() => {
          window.location.href = 'http://localhost:3001/admin/index.html#/collections/docs';
        }, 2000);
      })();
    </script>
  </body>
</html>`
    
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
