exports.up = function(pgm, run) {
    pgm.createTable( 'rates_source', {
        id: 'id',
        name: {
            type: 'varchar(256)',
            unique: true,
            notNull: true
        },
        code: {
            type: 'varchar(256)',
            unique: true,
            notNull: true
        }
    }, {

    } );
    run();
};

exports.down = function(pgm, run) {
    pgm.dropTable( 'rates_source' );
    run();
};
