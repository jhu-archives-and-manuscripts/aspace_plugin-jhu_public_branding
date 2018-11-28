function ResizableSidebar($sidebar) {
    this.$sidebar = $sidebar;

    this.$row = $sidebar.closest('.row');
    this.$content_pane = this.$row.find('> .col-sm-9');

    if (this.$content_pane.length == 0) {
        // only do things if there's a content pane and a sidebar
        this.$sidebar.removeClass('resizable-sidebar');
        return;
    }

    this.$row.addClass('has-resizable-content');

    this.add_handle();
    this.bind_events();
}

ResizableSidebar.prototype.add_handle = function() {
    var $handle = $('<a>').attr('href', 'javascript:void(0);');
    $handle.attr('aria-hidden', 'true');
    $handle.attr('aria-label', 'resizable sidebar handle');
    $handle.addClass('resizable-sidebar-handle');

    this.$sidebar.append($handle);

    this.$handle = $handle;
};

ResizableSidebar.prototype.bind_events = function() {
    var self = this;

    var min_sidebar_width = 200;
    var min_content_width = 300;
    var i_scrollbar_width = 20;

    var content_left = {
    			leftObject: self.$content_pane,
          rightObject: self.$sidebar,
          min_left_width: min_content_width,
          min_right_width: min_sidebar_width,
		}
    var content_right = {
    	    leftObject: self.$sidebar,
          rightObject: self.$content_pane,
          min_left_width: min_sidebar_width,
          min_right_width: min_content_width,
    }

    self.$handle.on('mousedown', function (e) {
        self.isResizing = true;
        self.lastDownX = e.clientX;
    });

    $(document).on('mousemove', function (e) {
        if (!self.isResizing) {
            return;
        }

        // content or sidebar on the left?
        if (self.$content_pane.offset().left < self.$sidebar.offset().left) {
        	object = content_left;
        } else {
        	object = content_right;
        }

        leftObject = object.leftObject;
        rightObject = object.rightObject;
        min_left_width = object.min_left_width;
        min_right_width = object.min_right_width;

        var cursor_x = e.clientX;
        var left_width = cursor_x - self.$row.offset().left;
        left_width = Math.max(left_width, min_left_width);
        left_width = Math.min(left_width, self.$row.width() - min_right_width);
        var right_width = self.$row.width() - left_width;

        rightObject.css('width', 0);
        leftObject.css('width', left_width);
        rightObject.css('width', right_width);

        // position the infinite scrollbar too, if it's about
        if ($('.infinite-record-scrollbar').length > 0) {
            // $('.infinite-record-scrollbar').css('left', self.$row.offset().left + new_content_width - i_scrollbar_width);
            $('.infinite-record-scrollbar').css('left', self.$row.offset().left + left_width);
        }
    }).on('mouseup', function (e) {
        self.isResizing = false;
    });
};

$(function() {
    $('.resizable-sidebar').each(function() {
        new ResizableSidebar($(this));
    });
});