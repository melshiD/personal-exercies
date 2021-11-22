var mergeTrees = function(root1, root2) {
    if(root1.length > 2000 || root2.length > 2000){return;}
    //handle node.val constraint: -10^4 <= Node.val <= 10^4
    
    var compositeTree = [],
        longerLength = Math.max(root1.length, root2.length);
    for(let i = 0; i < longerLength; i ++){
        if(!root1[i] && root2[i]){compositeTree.push(root2[i]);}
        else if(root1[i] && root2[i]){compositeTree.push(root1[i] + root2[i]);}
        else if(root1[i] && !root2[i]){compositeTree.push(root1[i]);}
        else if(!root1[i] && !root2[i]){compositeTree.push(null);}
    }
    return compositeTree;
};
var root1 = [1,3,2,5],
    root2 = [2,1,3,null,4,null,7];
//console.log(mergeTrees(root1, root2));
function printHello(){
    console.log('hello');
}

setTimeout(printHello, 1000);
console.log('me first');
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
 var mergeTrees = function(root1, root2) {
    //if(root1.length > 2000 || root2.length > 2000){return;}
    //handle node.val constraint: -10^4 <= Node.val <= 10^4
    if(root1 == null){return root2;}
    if(root2 == null){return root1;}
    root1.val = root1.val + root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);
    return root1;
};
//last version accepted.