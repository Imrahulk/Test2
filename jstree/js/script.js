var j = jQuery.noConflict();
j(document).ready(function () {
    j('.jstree')
    .on('after_open.jstree', function (e, data) {
      if (data.id != "#" && data.node.original && data.node.original.isenabled ) {
        insertEditButton();
      } else {
        insertEmptyButton();
      }
    })
    .jstree({
      "plugins": ["types", "checkbox"],
      'core': {
        'data': {
          "url": "http://e1f89c82.ngrok.io/getjson?lazy",
          "data": function (node) {
            console.log(node);
            return { "id": node.id };
          }
        },
        "themes": {
          "default": "large",
          "dots": false
        }
      }
    });

    insertEditButton();
});

function insertEditButton() {
  var interval = setInterval(function(){
    if (j('.jstree-icon.jstree-themeicon').length > 0){
      j.each(j('.jstree-icon.jstree-themeicon'), function() {
        if (j(this).prev('.add-settings-icon').length === 0){
          j(this).before("<div class='edit-settings-icon' data-toggle='modal' data-target='#exampleModal'></div>");
          j(this).before("<div class='add-settings-icon' data-toggle='modal' data-target='#exampleModal'></div>");
          j('.edit-settings-icon').unbind("click");
          j('.edit-settings-icon').bind("click", function(e) {
            e.stopPropagation();
            j("#exampleModal").modal('show');
            var $btn = j(this);
            setTimeout(function() {
              j("#folderName").val(j($btn).parent('.jstree-anchor').text())
            }, 500);
          });
        }
      });
      clearInterval(interval);
    }
  }, 100);
}

function insertEmptyButton() {
  var interval = setInterval(function(){
    if (j('.jstree-icon.jstree-themeicon').length > 0){
      j.each(j('.jstree-icon.jstree-themeicon'), function() {
        if (j(this).prev('.add-settings-icon').length === 0){
          j(this).before("<div class='edit-settings-icon empty-icon' data-toggle='modal' data-target='#exampleModal'></div>");
          j(this).before("<div class='add-settings-icon empty-icon' data-toggle='modal' data-target='#exampleModal'></div>");
        }
      });
      clearInterval(interval);
    }
  }, 100);
}