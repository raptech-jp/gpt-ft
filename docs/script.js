const contents = [];

function saveData() {
    const role1Selected = document.querySelector('input[name="role_1"]:checked');
    const text1Value = document.querySelector('textarea[name="text_1"]').value;
    const role2Selected = document.querySelector('input[name="role_2"]:checked');
    const text2Value = document.querySelector('textarea[name="text_2"]').value;

    if (!role1Selected || !text1Value || !role2Selected || !text2Value) {
        alert('全ての項目を入力してください。');
        return;
    }

    contents.push({ "messages":[{ "role": role1Selected.value, content: text1Value },{ "role": role2Selected.value, content: text2Value }]});
    console.log('保存されたメッセージ:', contents);

    document.querySelector('form').reset();
}

function saveDataAsJSONL() {
    if (contents.length === 0) {
        alert('メッセージがありません。');
        return;
    }

    const jsonlData = contents.map(message => JSON.stringify(message)).join('\n');

    const blob = new Blob([jsonlData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'contents.jsonl');
}

function saveAs(blob, filename) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
