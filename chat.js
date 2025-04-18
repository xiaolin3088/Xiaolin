const editor = document.getElementById('editor');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');

const repoOwner = 'xiaolin3088';
const repoName = 'Xiaolin';
const filePath = 'darksuper.txt'; // 保存文本的文件路径
const token = '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'; // 请妥善保管你的令牌

async function saveToGitHub() {
    const content = editor.value;
    const url = `https://api.github.com/repos/${xiaolin3088}/${Xiaolin}/contents/${darksuper.txt};
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${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}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update text file',
            content: btoa(content), // 将文本内容转换为Base64编码
            sha: await getFileSHA() // 获取文件的SHA值以更新现有文件
        })
    });

    if (response.ok) {
        alert('保存成功！');
    } else {
        alert('保存失败！');
    }
}

async function loadFromGitHub() {
    const url = `https://api.github.com/repos/${xiaolin3088}/${Xiaolin}/contents/${darksuper.txt}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${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}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        editor.value = atob(data.content); // 将Base64编码的内容解码为文本
    } else {
        alert('加载失败！');
    }
}

async function getFileSHA() {
    const url = `https://api.github.com/repos/${xiaolin3088}/${Xiaolin}/contents/${darksuper.txt}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${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}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.sha;
    } else {
        return null;
    }
}

saveButton.addEventListener('click', saveToGitHub);
loadButton.addEventListener('click', loadFromGitHub);
