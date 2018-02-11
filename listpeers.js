var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var inputJSON = inputChunks.join();
    var info = JSON.parse(inputJSON);
    var output = 'digraph my_peers { rankdir = LR; edge [dir=none, color=red]; node[shape=box];';
    var node_color;
    for (var x in info.peers) {
        for (var y in info.peers[x].channels){
                if (info.peers[x].channels[y].state=="CHANNELD_NORMAL") node_color="green"; else node_color="red";
                output += (' me -> "'+info.peers[x].id+'" [ label="'+info.peers[x].channels[y].msatoshi_to_us+"/"+info.peers[x].channels[y].msatoshi_total+' msat", color='+node_color+'];');
        }
    }
    output += "}";
    stdout.write(output);
    stdout.write('\n');
});
