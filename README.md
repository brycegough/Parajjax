# Parajjax
 Simple jQuery Scroll & Mouse Parallax
 
![Example](parajjax-example.gif)

### HTML
```HTML
<!-- In this example, the height is set relative to view width -->
<div style="height: 50vw;" data-parajjax="{
   "layers":[
      {
         "image":"/path/to/background.png",
         "sensitivity": 0,
         "cursor_sensitivity": 0,
         "classname": "",
         "srcset": "...",
         "alttext": "Parallax Background"
      },
      {
         "image":"/path/to/layer1.png",
         "sensitivity":"0.05",
         "cursor_sensitivity":"0.01",
         "classname":"parallax-layer-class",
         "srcset":"...",
         "alttext":"Parallax Layer 1"
      },
      {
         "image":"/path/to/layer2.png",
         "sensitivity": "0.3",
         "cursor_sensitivity": "0",
         "classname": "",
         "srcset": "...",
         "alttext": "Parallax Layer 2"
      }
   ]
}"></div>
```
****Note that you should escape the JSON to ensure you are using valid HTML
