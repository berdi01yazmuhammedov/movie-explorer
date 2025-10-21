import React from 'react'
interface CastProps {
    id: number;
}
const Cast: React.FC<CastProps> = ({id}) => {
    console.log(id);
    
  return (
    <div>Cast</div>
  )
}

export default Cast