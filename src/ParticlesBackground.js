import React from 'react';
import Particles from 'react-particles-js';

const ParticlesBackground = () => {
    return(
        <div style={{
            position: "absolute",
            top: '20px',
            left: '80px',
            width: "90%",
            height: "90%"
          }}>
      <Particles 
        params={{ 
          particles: {
            color: {
              "value": "#5CDB95"
            },
            line_linked:{
              color: '#5CDB95',
              opacity: 0.45
            },
            number: { 
              value: 30, 
              density: { 
                enable: true, 
                value_area: 400 
              },
            }, 
            
          }, 
        }} 
      /> 
      </div>
    );
}

export default ParticlesBackground;