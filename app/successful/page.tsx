'use client'

export default function SuccessfulPage() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        padding: '3rem',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ 
          margin: '1rem 0', 
          fontSize: '2rem', 
          fontWeight: '600' 
        }}>
          Login Successful!
        </h1>
        <p style={{ 
          margin: '1rem 0', 
          fontSize: '1.1rem', 
          opacity: '0.9' 
        }}>
          You have successfully authenticated with GitHub.
        </p>
        <p style={{ 
          margin: '1rem 0', 
          fontSize: '1.1rem', 
          opacity: '0.9' 
        }}>
          Welcome to your content management system!
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href="/admin#/collections/docs" 
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              marginRight: '12px',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            Go to Documentation CMS
          </a>
          <a 
            href="/" 
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  )
}
