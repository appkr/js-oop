var oojs = (function(oojs) {

  var PropertyValueChangedEvent = function(type, value) {
    EventType.call(this, type);

    Object.defineProperty(this, "value", {
      value: value,
      enumerable: true
    });
  };

  PropertyValueChangedEvent.prototype = Object.create(EventType.prototype);

  var ItemAddedEvent = function(item) {
    EventType.call(this, "itemadded");

    Object.defineProperty(this, "item", {
      value: item,
      enumerable: true
    });
  };

  ItemAddedEvent.prototype = Object.create(EventType.prototype);

  var ItemRemovedEvent = function(index) {
    EventType.call(this, "itemremoved");

    Object.defineProperty(this, "index", {
      value: index,
      enumerable: true
    });
  };

  ItemRemovedEvent.prototype = Object.create(EventTarget.prototype);

  var AppendedEvent = function(parentElement) {
    EventType.call(this, "appended");

    Object.defineProperty(this, "parentElement", {
      value: parentElement,
      enumerable: true
    });
  };

  AppendedEvent.prototype = Object.create(EventType.prototype);

  // Create single element in Toolbar
  // @itemElement a single "span"
  var ToolbarItem = function (itemElement) {
    EventTarget.call(this);

    Object.defineProperty(this, "__el", {
      value : itemElement
    });
  };

  // Define properties of single element
  ToolbarItem.prototype = Object.create(EventTarget.prototype, {
    toggleActiveState : {
      value : function () {
        this.activated = ! this.activated;
      },
      enumerable : true
    },
    enabled : {
      get : function () {
        return ! this.__el.classList.contains("disabled");
      },
      set : function (value) {
        var currentValue = this.enabled;

        if (currentValue === value) {
          return;
        }

        if (value) {
          this.__el.classList.remove("disabled");
        } else {
          this.__el.classList.add("disabled");
        }

        this.__fire(new PropertyValueChangedEvent("enabledchanged", value) );
      }
    },
    activated : {
      get : function () {
        return this.__el.classList.contains("active");
      },
      set : function (value) {
        var currentValue = this.activated;

        if (currentValue === value) {
          return;
        }

        if (value) {
          this.__el.classList.add("active");
        } else {
          this.__el.classList.remove("active");
        }

        this.__fire(new PropertyValueChangedEvent("activatedchanged", value) );
      }
    }
  });

  // Define collection of toolbar element
  // @itemElements collection of "span"
  var createToolbarItems = function (itemElements) {
    var items = [];

    [].forEach.call(itemElements, function (el, index, array) {
      var item = new ToolbarItem(el);

      items.push(item);
    });

    return items;
  };

  // Define Toolbar
  // @toolbarElement a single "div"
  var Toolbar = function (toolbarElement) {
    EventTarget.call(this);

    var items = toolbarElement.querySelectorAll(".toolbar-item");

    Object.defineProperties(this, {
      __el : {
        value : toolbarElement
      },
      items : {
        value : createToolbarItems(items),
        enumerable : true
      }
    });
  };

  // Define properties of Toolbar
  Toolbar.prototype = Object.create(EventTarget.prototype, {
    add : {
      value : function (options) {
        var span = document.createElement("SPAN");
        span.className = "toolbar-item";

        this.__el.appendChild(span);

        var item = new ToolbarItem(span);

        this.items.push(item);

        this.__fire(new ItemAddedEvent(item));
      },
      enumerable: true
    },
    remove : {
      value : function (index) {
        var len = this.items.length;

        if (index > len || index < 0) {
          throw new Error("Index is out of range");
        }

        var item = this.items[index];
        this.items.splice(index, 1);

        this.__el.removeChild(item.__el);

        item = null;

        this.__fire(new ItemRemovedEvent(index));
      },
      enumerable : true
    },
    appendTo : {
      value : function (parentElement) {
        parentElement.appendChild(this.__el);

        this.__fire(new AppendedEvent(parentElement));
      },
      enumerable : true
    }
  });

  // Define Toolbar.
  oojs.createToolbar = function(elementId) {
    var element = document.getElementById(elementId);

    if (! element) {
      element = document.createElement("DIV");
      element.id = elementId;
      element.className = "toolbar";
    }

    return new Toolbar(element);
  };

  return oojs;

})(oojs || {});

/* How to test at browser console
var toolbar = oojs.createToolbar("myToolbar");
toolbar.appendTo(document.body);
toolbar.add();
toolbar.add();
toolbar.add();
toolbar.remove(1);
toolbar.items[0].enabled = false;
toolbar.items[0].enabled = true;
toolbar.items[0].activated = true;
toolbar.items[0].activated = false;
toolbar.items[0].toggleActiveState();
*/