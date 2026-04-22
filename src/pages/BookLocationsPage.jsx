import { useLibrary } from '../context/LibraryContext.jsx';

function BookLocationsPage() {
  const { books } = useLibrary();
  const floors = [
    {
      id: '1',
      title: 'Ground Floor',
      subtitle: 'Technology & Design',
      mapSrc: '/floor-1-map.jpg'
    },
    {
      id: '2',
      title: 'Second Floor',
      subtitle: 'Analytics & QR Systems',
      mapSrc: '/floor-2-map.avif'
    },
    {
      id: '3',
      title: 'Third Floor',
      subtitle: 'Management & Student Life',
      mapSrc: '/floor-3-map.jpg'
    }
  ];

  const grouped = books.reduce((acc, book) => {
    if (!acc[book.floor]) acc[book.floor] = [];
    acc[book.floor].push(book);
    return acc;
  }, {});

  return (
    <div className="page-shell page-card-grid location-page">
      <section className="card feature-card">
        <h2>Book Locations</h2>
        <p className="muted">Locate exact floor, section and shelf using current library inventory data.</p>
      </section>

      <section className="card location-map-panel">
        <div className="map-grid">
          {floors.map((floor) => (
            <div key={floor.id} className="floor-card">
              <div className="floor-label">
                <span>Floor {floor.id}</span>
                <strong>{floor.title}</strong>
              </div>
              <img className="floor-map" src={floor.mapSrc} alt={`${floor.title} Map`} />
              <p>{floor.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card location-list-card">
        <div className="location-summary">
          <h3>Category shelves by floor</h3>
          <p className="muted">Each map shows a floor layout with shelf location guidance for popular categories.</p>
        </div>

        <div className="book-location-grid">
          {Object.entries(grouped).map(([floor, floorBooks]) => (
            <div key={floor} className="book-location-group card-light">
              <h4>Floor {floor}</h4>
              <div className="location-tags">
                {floorBooks.map((book) => (
                  <span key={book.id} className="category-chip">
                    {book.category}
                  </span>
                ))}
              </div>
              <div className="location-book-list">
                {floorBooks.map((book) => (
                  <div key={book.id} className="location-card">
                    <div>
                      <h5>{book.title}</h5>
                      <p className="muted">{book.author}</p>
                    </div>
                    <div className="location-pill">Shelf {book.shelf}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookLocationsPage;
