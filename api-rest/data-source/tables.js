class Tables {

    init(connection) {
        this.connection = connection;
        this.criarTabelaAtendimentos();
        this.criarTabelaPets();
    }

    criarTabelaAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (' +
            'id int NOT NULL AUTO_INCREMENT, ' +
            'cliente varchar(50) NOT NULL, ' +
            'pet varchar(20), ' +
            'servico varchar(20) NOT NULL, ' +
            'status varchar(20) NOT NULL, ' +
            'observacoes text, ' +
            'data datetime NOT NULL, ' +
            'dataCriacao datetime NOT NULL, ' +
            'PRIMARY KEY(id))';

        this.querySqlExecute(sql, 'Atendimentos');
    }

    criarTabelaPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (' +
            'id int NOT NULL AUTO_INCREMENT, ' +
            'nome varchar(50) NOT NULL, ' +
            'imagem varchar(200), ' +
            'PRIMARY KEY(id))';

        this.querySqlExecute(sql, 'Pets');
    }

    querySqlExecute(sqlCommand, tableName) {

        this.connection.query(sqlCommand, (erro) => {
            if (erro) console.log(erro)
            else console.log(`Tabela ${tableName} criada com sucesso!`)
        });
        
    }
}

module.exports = new Tables;