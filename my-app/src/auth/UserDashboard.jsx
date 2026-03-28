import React, { useEffect, useRef } from 'react';

const ProsperityDashboard = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.snapshot-card, .chart-card, .goal-card, .insight-card').forEach(card => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --sage-50: #f7faf8;
          --sage-100: #e8f5ed;
          --sage-200: #d1ebd9;
          --sage-300: #a8dbb8;
          --sage-400: #7bc896;
          --sage-500: #5db67d;
          --sage-600: #4a9b67;
          --sage-700: #3d7f55;
          --sage-800: #2f6342;
          --sage-900: #234d33;
          
          --cream: #fffef9;
          --warm-white: #fdfcf7;
          --soft-shadow: rgba(93, 182, 125, 0.08);
          --accent-glow: rgba(123, 200, 150, 0.15);
          
          --warning: #f59e0b;
          --warning-light: #fef3c7;
          --success: #10b981;
          --success-light: #d1fae5;
          --info: #3b82f6;
          --info-light: #dbeafe;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Jost', sans-serif;
          background: linear-gradient(135deg, var(--cream) 0%, var(--sage-50) 100%);
          color: var(--sage-900);
          line-height: 1.6;
        }

        header {
          background: white;
          padding: 1.5rem 5%;
          box-shadow: 0 2px 10px var(--soft-shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          width: 40px;
          height: 40px;
        }

        .tree-trunk { fill: var(--sage-700); }
        .tree-leaves { fill: var(--sage-500); }
        .tree-highlight { fill: var(--sage-300); }

        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: var(--sage-800);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--sage-400), var(--sage-600));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .user-info h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--sage-900);
        }

        .user-info p {
          font-size: 0.85rem;
          color: var(--sage-600);
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem 5%;
        }

        .welcome-section {
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-section h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.5rem;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .welcome-section p {
          font-size: 1.1rem;
          color: var(--sage-600);
        }

        .grade-card {
          background: linear-gradient(135deg, var(--sage-600), var(--sage-700));
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 2.5rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2.5rem;
          align-items: center;
          box-shadow: 0 10px 40px rgba(93, 182, 125, 0.2);
          animation: fadeInUp 0.6s ease-out 0.1s backwards;
          position: relative;
          overflow: hidden;
        }

        .grade-decoration {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
        }

        .grade-display {
          position: relative;
          z-index: 1;
        }

        .grade-letter {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--sage-700);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          position: relative;
        }

        .grade-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: conic-gradient(var(--sage-300) 0deg 328deg, var(--sage-100) 328deg 360deg);
        }

        .grade-letter-inner {
          position: relative;
          z-index: 1;
        }

        .grade-info {
          position: relative;
          z-index: 1;
        }

        .grade-info h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: white;
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .grade-score {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .grade-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .grade-breakdown {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .grade-metric {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-size: 0.9rem;
        }

        .grade-metric-icon {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .grade-action {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .grade-btn {
          padding: 1rem 2rem;
          background: white;
          color: var(--sage-700);
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .grade-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .timeline-section {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          animation: fadeInUp 0.6s ease-out 0.9s backwards;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .timeline-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 2.5rem;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .timeline-header p {
          font-size: 1.1rem;
          color: var(--sage-600);
        }

        .timeline-container {
          position: relative;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--sage-100);
          border-radius: 2px;
        }

        .timeline-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, var(--sage-500), var(--sage-600));
          border-radius: 2px;
          width: 16.67%;
          animation: growTimeline 2s ease-out 1s backwards;
        }

        @keyframes growTimeline {
          from { width: 0; }
        }

        .timeline-markers {
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .timeline-marker {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .marker-dot {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          border: 4px solid var(--sage-100);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.5s ease;
          animation: fadeIn 0.6s ease-out backwards;
        }

        .timeline-marker:nth-child(1) .marker-dot { animation-delay: 1.1s; }
        .timeline-marker:nth-child(2) .marker-dot { animation-delay: 1.2s; }
        .timeline-marker:nth-child(3) .marker-dot { animation-delay: 1.3s; }
        .timeline-marker:nth-child(4) .marker-dot { animation-delay: 1.4s; }
        .timeline-marker:nth-child(5) .marker-dot { animation-delay: 1.5s; }
        .timeline-marker:nth-child(6) .marker-dot { animation-delay: 1.6s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .marker-dot.current {
          border-color: var(--sage-600);
          background: linear-gradient(135deg, var(--sage-500), var(--sage-600));
          box-shadow: 0 4px 20px rgba(93, 182, 125, 0.3);
          transform: scale(1.1);
        }

        .marker-dot.current .marker-icon,
        .marker-dot.current .marker-year {
          color: white;
        }

        .marker-dot.future {
          border-color: var(--sage-200);
        }

        .marker-icon {
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }

        .marker-year {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--sage-700);
        }

        .marker-content {
          text-align: center;
          max-width: 180px;
        }

        .marker-title {
          font-weight: 600;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .marker-description {
          font-size: 0.85rem;
          color: var(--sage-600);
          line-height: 1.4;
        }

        .marker-value {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: var(--sage-100);
          color: var(--sage-700);
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .marker-dot.current .marker-value {
          background: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .timeline-summary {
          margin-top: 3rem;
          padding: 2rem;
          background: linear-gradient(135deg, var(--sage-50), var(--sage-100));
          border-radius: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .summary-stat {
          text-align: center;
        }

        .summary-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--sage-800);
          margin-bottom: 0.25rem;
        }

        .summary-label {
          font-size: 0.9rem;
          color: var(--sage-600);
        }

        .summary-highlight {
          color: var(--sage-600);
          font-weight: 600;
        }

        .snapshot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .snapshot-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          border: 1px solid var(--sage-100);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .snapshot-card:nth-child(1) { animation-delay: 0.1s; }
        .snapshot-card:nth-child(2) { animation-delay: 0.2s; }
        .snapshot-card:nth-child(3) { animation-delay: 0.3s; }
        .snapshot-card:nth-child(4) { animation-delay: 0.4s; }

        .snapshot-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(93, 182, 125, 0.12);
        }

        .snapshot-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .snapshot-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .icon-green { background: var(--success-light); }
        .icon-blue { background: var(--info-light); }
        .icon-orange { background: var(--warning-light); }
        .icon-sage { background: var(--sage-100); }

        .snapshot-header h3 {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--sage-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .snapshot-value {
          font-size: 2.2rem;
          font-weight: 600;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
        }

        .snapshot-subtitle {
          font-size: 0.9rem;
          color: var(--sage-600);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
        }

        .trend.up { color: var(--success); }
        .trend.down { color: var(--warning); }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          border: 1px solid var(--sage-100);
          animation: fadeInUp 0.6s ease-out 0.5s backwards;
        }

        .chart-header {
          margin-bottom: 2rem;
        }

        .chart-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .chart-header p {
          color: var(--sage-600);
          font-size: 0.95rem;
        }

        .spending-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .spending-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .spending-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .spending-info {
          flex: 1;
        }

        .spending-name {
          font-weight: 500;
          color: var(--sage-900);
          margin-bottom: 0.25rem;
        }

        .spending-bar-container {
          width: 100%;
          height: 8px;
          background: var(--sage-100);
          border-radius: 4px;
          overflow: hidden;
        }

        .spending-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-out;
          animation: growWidth 1.5s ease-out backwards;
        }

        @keyframes growWidth {
          from { width: 0; }
        }

        .spending-amount {
          font-weight: 600;
          color: var(--sage-900);
          min-width: 80px;
          text-align: right;
        }

        .spending-percentage {
          font-size: 0.85rem;
          color: var(--sage-600);
          min-width: 45px;
          text-align: right;
        }

        .goals-section {
          animation: fadeInUp 0.6s ease-out 0.6s backwards;
        }

        .goal-card {
          background: white;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          border: 1px solid var(--sage-100);
          margin-bottom: 1.5rem;
        }

        .goal-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .goal-title {
          font-weight: 600;
          color: var(--sage-900);
          font-size: 1.05rem;
        }

        .goal-status {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-on-track {
          background: var(--success-light);
          color: var(--success);
        }

        .status-attention {
          background: var(--warning-light);
          color: var(--warning);
        }

        .goal-progress {
          margin: 1rem 0;
        }

        .progress-bar-container {
          width: 100%;
          height: 10px;
          background: var(--sage-100);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--sage-500), var(--sage-600));
          border-radius: 5px;
          transition: width 1s ease-out;
          animation: growWidth 1.5s ease-out backwards;
        }

        .progress-text {
          font-size: 0.9rem;
          color: var(--sage-600);
          display: flex;
          justify-content: space-between;
        }

        .goal-meta {
          font-size: 0.85rem;
          color: var(--sage-600);
          margin-top: 0.75rem;
        }

        .insights-section {
          margin-top: 2.5rem;
          animation: fadeInUp 0.6s ease-out 0.7s backwards;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .insight-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          border-left: 4px solid var(--sage-500);
          margin-bottom: 1.25rem;
          display: flex;
          gap: 1.25rem;
          align-items: start;
        }

        .insight-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--sage-300), var(--sage-400));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .insight-content h3 {
          font-weight: 600;
          color: var(--sage-900);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .insight-content p {
          color: var(--sage-700);
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .insight-action {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: var(--sage-500);
          color: white;
          border-radius: 20px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .insight-action:hover {
          background: var(--sage-600);
          transform: translateY(-2px);
        }

        .budget-overview {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px var(--soft-shadow);
          border: 1px solid var(--sage-100);
          margin-top: 2rem;
          animation: fadeInUp 0.6s ease-out 0.8s backwards;
        }

        .budget-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .budget-item {
          text-align: center;
        }

        .budget-circle {
          width: 140px;
          height: 140px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .budget-circle::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          padding: 5px;
          background: linear-gradient(135deg, var(--sage-400), var(--sage-600));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .budget-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--sage-900);
        }

        .budget-label {
          font-size: 0.85rem;
          color: var(--sage-600);
          margin-top: 0.25rem;
        }

        .budget-item h4 {
          font-weight: 600;
          color: var(--sage-900);
          margin-bottom: 0.25rem;
        }

        .budget-item p {
          font-size: 0.9rem;
          color: var(--sage-600);
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .timeline-markers {
            flex-wrap: wrap;
          }

          .timeline-marker {
            min-width: 150px;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1.5rem 4%;
          }

          .welcome-section h1 {
            font-size: 2rem;
          }

          .snapshot-grid {
            grid-template-columns: 1fr;
          }

          .budget-grid {
            grid-template-columns: 1fr;
          }

          .user-profile {
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
          }

          .grade-card {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }

          .grade-display {
            display: flex;
            justify-content: center;
          }

          .grade-info {
            text-align: center;
          }

          .grade-breakdown {
            justify-content: center;
          }

          .timeline-markers {
            flex-direction: column;
            align-items: center;
          }

          .timeline-line {
            display: none;
          }

          .timeline-marker {
            width: 100%;
            max-width: 300px;
            margin-bottom: 2rem;
          }

          .marker-content {
            max-width: 100%;
          }

          .timeline-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header>
        <div className="logo-container">
          <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect className="tree-trunk" x="44" y="60" width="12" height="30" rx="2"/>
            <ellipse className="tree-leaves" cx="50" cy="55" rx="28" ry="20"/>
            <ellipse className="tree-leaves" cx="50" cy="40" rx="24" ry="18"/>
            <ellipse className="tree-leaves" cx="50" cy="28" rx="18" ry="14"/>
            <ellipse className="tree-highlight" cx="45" cy="30" rx="8" ry="6" opacity="0.6"/>
            <ellipse className="tree-highlight" cx="55" cy="45" rx="10" ry="7" opacity="0.5"/>
          </svg>
          <h1 className="brand-name">Prosperity</h1>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <h3>Angelina Ponce</h3>
            <p>Intermediate Learner</p>
          </div>
          <div className="user-avatar">AP</div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome back, Angelina! 🌱</h1>
          <p>You're making great progress on your financial journey. Here's your personalized overview.</p>
        </div>

        {/* Financial Health Grade */}
        <div className="grade-card">
          <div className="grade-decoration"></div>
          <div className="grade-display">
            <div className="grade-letter">
              <div className="grade-ring"></div>
              <div className="grade-letter-inner">A-</div>
            </div>
          </div>
          <div className="grade-info">
            <h2>Financial Health Grade</h2>
            <div className="grade-score">91<span style={{fontSize: '1.5rem', opacity: 0.9}}>/100</span></div>
            <p className="grade-subtitle">Excellent financial management and discipline</p>
            <div className="grade-breakdown">
              <div className="grade-metric">
                <div className="grade-metric-icon">💰</div>
                <span>Savings: A</span>
              </div>
              <div className="grade-metric">
                <div className="grade-metric-icon">📊</div>
                <span>Spending: A-</span>
              </div>
              <div className="grade-metric">
                <div className="grade-metric-icon">🎯</div>
                <span>Goals: A-</span>
              </div>
              <div className="grade-metric">
                <div className="grade-metric-icon">💳</div>
                <span>Debt Mgmt: A</span>
              </div>
            </div>
          </div>
          <div className="grade-action">
            <a href="#timeline" className="grade-btn">See Your Future →</a>
          </div>
        </div>

        {/* Financial Snapshot */}
        <div className="snapshot-grid">
          <div className="snapshot-card">
            <div className="snapshot-header">
              <div className="snapshot-icon icon-green">💰</div>
              <h3>Monthly Income</h3>
            </div>
            <div className="snapshot-value">$6,250</div>
            <div className="snapshot-subtitle">
              <span className="trend up">↑ 3%</span>
              <span>from last month</span>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-header">
              <div className="snapshot-icon icon-blue">📊</div>
              <h3>Monthly Spending</h3>
            </div>
            <div className="snapshot-value">$3,450</div>
            <div className="snapshot-subtitle">
              <span className="trend down">↓ 12%</span>
              <span>from last month</span>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-header">
              <div className="snapshot-icon icon-sage">💎</div>
              <h3>Net Worth</h3>
            </div>
            <div className="snapshot-value">$18,500</div>
            <div className="snapshot-subtitle">
              <span className="trend up">↑ 15%</span>
              <span>YTD growth</span>
            </div>
          </div>

          <div className="snapshot-card">
            <div className="snapshot-header">
              <div className="snapshot-icon icon-orange">🎯</div>
              <h3>Savings Rate</h3>
            </div>
            <div className="snapshot-value">44.8%</div>
            <div className="snapshot-subtitle">
              <span>$2,800 saved this month</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Spending Breakdown */}
          <div className="chart-card">
            <div className="chart-header">
              <h2>Spending Breakdown</h2>
              <p>Where your money went this month</p>
            </div>
            <div className="spending-items">
              <div className="spending-item">
                <div className="spending-color" style={{background: '#4a9b67'}}></div>
                <div className="spending-info">
                  <div className="spending-name">Housing & Utilities</div>
                  <div className="spending-bar-container">
                    <div className="spending-bar" style={{width: '43%', background: '#4a9b67'}}></div>
                  </div>
                </div>
                <div className="spending-amount">$1,600</div>
                <div className="spending-percentage">43%</div>
              </div>

              <div className="spending-item">
                <div className="spending-color" style={{background: '#7bc896'}}></div>
                <div className="spending-info">
                  <div className="spending-name">Groceries & Food</div>
                  <div className="spending-bar-container">
                    <div className="spending-bar" style={{width: '18%', background: '#7bc896', animationDelay: '0.2s'}}></div>
                  </div>
                </div>
                <div className="spending-amount">$680</div>
                <div className="spending-percentage">18%</div>
              </div>

              <div className="spending-item">
                <div className="spending-color" style={{background: '#a8dbb8'}}></div>
                <div className="spending-info">
                  <div className="spending-name">Student Loan Payment</div>
                  <div className="spending-bar-container">
                    <div className="spending-bar" style={{width: '16%', background: '#a8dbb8', animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <div className="spending-amount">$600</div>
                <div className="spending-percentage">16%</div>
              </div>

              <div className="spending-item">
                <div className="spending-color" style={{background: '#5db67d'}}></div>
                <div className="spending-info">
                  <div className="spending-name">Insurance</div>
                  <div className="spending-bar-container">
                    <div className="spending-bar" style={{width: '11%', background: '#5db67d', animationDelay: '0.6s'}}></div>
                  </div>
                </div>
                <div className="spending-amount">$420</div>
                <div className="spending-percentage">11%</div>
              </div>

              <div className="spending-item">
                <div className="spending-color" style={{background: '#d1ebd9'}}></div>
                <div className="spending-info">
                  <div className="spending-name">Entertainment & Other</div>
                  <div className="spending-bar-container">
                    <div className="spending-bar" style={{width: '12%', background: '#d1ebd9', animationDelay: '0.8s'}}></div>
                  </div>
                </div>
                <div className="spending-amount">$420</div>
                <div className="spending-percentage">12%</div>
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="goals-section">
            <div className="chart-header">
              <h2>Your Goals</h2>
              <p>Track your progress</p>
            </div>

            <div className="goal-card">
              <div className="goal-header">
                <div className="goal-title">💳 Pay Off Student Loans</div>
                <div className="goal-status status-on-track">On Track</div>
              </div>
              <div className="goal-progress">
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: '32%'}}></div>
                </div>
                <div className="progress-text">
                  <span>$9,600 paid</span>
                  <span>$30,000 total</span>
                </div>
              </div>
              <div className="goal-meta">Expected completion: Dec 2028 • 32 months left</div>
            </div>

            <div className="goal-card">
              <div className="goal-header">
                <div className="goal-title">🏦 Emergency Fund</div>
                <div className="goal-status status-on-track">On Track</div>
              </div>
              <div className="goal-progress">
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: '73%', animationDelay: '0.2s'}}></div>
                </div>
                <div className="progress-text">
                  <span>$11,000 saved</span>
                  <span>$15,000 goal</span>
                </div>
              </div>
              <div className="goal-meta">6 months of expenses • ~16 weeks to goal</div>
            </div>

            <div className="goal-card">
              <div className="goal-header">
                <div className="goal-title">📈 Start Investing</div>
                <div className="goal-status status-attention">Need Attention</div>
              </div>
              <div className="goal-progress">
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: '0%', animationDelay: '0.4s'}}></div>
                </div>
                <div className="progress-text">
                  <span>$0 invested</span>
                  <span>Ready to begin</span>
                </div>
              </div>
              <div className="goal-meta">Recommended: Open a Roth IRA and start with $200/month</div>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="budget-overview">
          <div className="chart-header">
            <h2>Monthly Budget Overview</h2>
            <p>Your spending vs. target for February 2026</p>
          </div>
          <div className="budget-grid">
            <div className="budget-item">
              <div className="budget-circle">
                <div className="budget-value">55%</div>
                <div className="budget-label">Budget Used</div>
              </div>
              <h4>Spending Efficiency</h4>
              <p>You're under budget by $450</p>
            </div>

            <div className="budget-item">
              <div className="budget-circle">
                <div className="budget-value">$2,800</div>
                <div className="budget-label">This Month</div>
              </div>
              <h4>Amount Saved</h4>
              <p>44.8% of your income</p>
            </div>

            <div className="budget-item">
              <div className="budget-circle">
                <div className="budget-value">91%</div>
                <div className="budget-label">Financial Health</div>
              </div>
              <h4>Prosperity Score</h4>
              <p>Excellent financial habits</p>
            </div>
          </div>
        </div>

        {/* Financial Future Timeline */}
        <div className="timeline-section" id="timeline">
          <div className="timeline-header">
            <h2>Your Financial Future</h2>
            <p>See where you'll be if you follow our personalized plan</p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line">
              <div className="timeline-progress"></div>
            </div>
            <div className="timeline-markers">
              {/* Marker 1: Now */}
              <div className="timeline-marker">
                <div className="marker-dot current">
                  <div className="marker-icon">📍</div>
                  <div className="marker-year">2026</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">Today</div>
                  <div className="marker-description">Strong savings habit established</div>
                  <div className="marker-value">$18.5K net worth</div>
                </div>
              </div>

              {/* Marker 2: 1 Year */}
              <div className="timeline-marker">
                <div className="marker-dot future">
                  <div className="marker-icon">🎯</div>
                  <div className="marker-year">2027</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">Emergency Fund Complete</div>
                  <div className="marker-description">6 months expenses saved + investing started</div>
                  <div className="marker-value">$48.2K net worth</div>
                </div>
              </div>

              {/* Marker 3: 2 Years */}
              <div className="timeline-marker">
                <div className="marker-dot future">
                  <div className="marker-icon">💎</div>
                  <div className="marker-year">2028</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">Student Loans 50% Paid</div>
                  <div className="marker-description">Investment portfolio growing steadily</div>
                  <div className="marker-value">$82.7K net worth</div>
                </div>
              </div>

              {/* Marker 4: 3 Years */}
              <div className="timeline-marker">
                <div className="marker-dot future">
                  <div className="marker-icon">🎓</div>
                  <div className="marker-year">2029</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">Debt Free!</div>
                  <div className="marker-description">Student loans completely paid off</div>
                  <div className="marker-value">$118.5K net worth</div>
                </div>
              </div>

              {/* Marker 5: 5 Years */}
              <div className="timeline-marker">
                <div className="marker-dot future">
                  <div className="marker-icon">🏡</div>
                  <div className="marker-year">2031</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">House Down Payment Ready</div>
                  <div className="marker-description">20% down saved for home purchase</div>
                  <div className="marker-value">$195K net worth</div>
                </div>
              </div>

              {/* Marker 6: 10 Years */}
              <div className="timeline-marker">
                <div className="marker-dot future">
                  <div className="marker-icon">🌟</div>
                  <div className="marker-year">2036</div>
                </div>
                <div className="marker-content">
                  <div className="marker-title">Financial Independence</div>
                  <div className="marker-description">Investment portfolio generating passive income</div>
                  <div className="marker-value">$425K net worth</div>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-summary">
            <div className="summary-stat">
              <div className="summary-value">+$406K</div>
              <div className="summary-label">Net Worth Growth by 2036</div>
            </div>
            <div className="summary-stat">
              <div className="summary-value">3.2 years</div>
              <div className="summary-label">Until Debt Free</div>
            </div>
            <div className="summary-stat">
              <div className="summary-value">$2,800</div>
              <div className="summary-label">Avg Monthly Savings</div>
            </div>
            <div className="summary-stat">
              <div className="summary-value">36 years old</div>
              <div className="summary-label">When You Hit <span className="summary-highlight">$425K</span></div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="insights-section">
          <div className="section-header">
            <h2>Personalized Insights</h2>
            <p>AI-powered recommendations just for you</p>
          </div>

          <div className="insight-card">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h3>You're Ready to Start Investing!</h3>
              <p>Great news! With your emergency fund at 73% and consistent savings of $2,800/month, you're in an excellent position to begin investing. Based on your age (26) and intermediate financial literacy, we recommend starting with a Roth IRA and low-cost index funds.</p>
              <a href="#" className="insight-action">Explore Investment Options</a>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h3>Optimize Your Debt Payoff Strategy</h3>
              <p>Your student loan has an 18.5% interest rate. By increasing your payment by just $200/month, you could save $4,800 in interest and finish 14 months earlier. This would free up $800/month for investing sooner.</p>
              <a href="#" className="insight-action">See Payoff Calculator</a>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">📊</div>
            <div className="insight-content">
              <h3>Entertainment Spending is Down 20%</h3>
              <p>You've been crushing your entertainment budget! You're spending $400/month vs. your $500 target. Consider redirecting this $100 savings toward your investment goal or accelerating your emergency fund completion.</p>
              <a href="#" className="insight-action">Update Budget Allocation</a>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🌟</div>
            <div className="insight-content">
              <h3>Financial Milestone Approaching!</h3>
              <p>You're just $4,000 away from completing your 6-month emergency fund! At your current pace, you'll reach this critical milestone in about 8 weeks. This is a huge accomplishment for someone at your age.</p>
              <a href="#" className="insight-action">View Milestone Timeline</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProsperityDashboard;