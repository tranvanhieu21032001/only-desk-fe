const ListSkeleton = () => (
  <div style={{ padding: 24 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: '#eee',
            marginRight: 12,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              width: 120,
              height: 16,
              background: '#eee',
              marginBottom: 8,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 200,
              height: 12,
              background: '#f3f3f3',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default ListSkeleton;
