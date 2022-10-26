import React from 'react';
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div>
      404 NOT FOUND. Return <Link to="/">Main Page</Link>
    </div>
  );
}
export { Notfound };
