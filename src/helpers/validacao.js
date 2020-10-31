function blackList(texto) {
    const list = [
        'vadia', 'puta', 'puto', 'putinha', 'caralho', 'fuder', 'fudeu', 'piroca', 'buceta', 'arrombado', 'filhodaputa',
        'cu', 'cú', 'cuzinho', 'pariu', 'xoxota', 'xereca', 'boiola', 'viadinho', 'viadão', 'viadao', 'criolo', 'criolinho',
        'rola', 'rôla', 'pica', 'boquete', 'foda-se', 'piru', 'penis', 'pênis', 'bunda', 'merda', 'cuzao', 'cuzão', 'pirocudo'
    ];

    // const listUpper = [];
    // list.map(l => listUpper.push(l.toUpperCase()));

    let termos = texto.toLowerCase().split(' ');
    for (let i = 0; i < list.length; i++) {
        if (termos.indexOf(list[i]) >= 0) return false;
    }

    return true;
}

export default blackList;
