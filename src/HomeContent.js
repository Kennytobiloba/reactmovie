export default function HomeContent({ handleSearchChange }) {
  return (
    <div className='home'>
      <div className='navbar'>
        <div className='logo'>
          <img src='logo.png' alt='Logo' />
        </div>
        <div className='search'>
          {/* Input field with onChange event calling handleSearchChange */}
          <input
            type='text'
            placeholder='Search for movies...'
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}
