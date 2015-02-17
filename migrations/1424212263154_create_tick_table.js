exports.up = function(pgm, run) {
    pgm.createTable('tick', {
        id: { type: 'bigserial', primaryKey: true },
        'created_at': { type: 'timestamp without time zone', notNull: true },
        'received_at': { type: 'timestamp without time zone', notNull: true },
        'rate': { type: 'double precision', notNull: true, check: 'rate > 0' },
        'symbol_id': { type: 'integer', notNull: true }
    }, {});
    run();
};

exports.down = function(pgm, run) {
    pgm.dropTable('tick');
    run();
};
