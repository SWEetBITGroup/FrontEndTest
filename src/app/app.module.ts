import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { JointComponent } from './components/joint/joint.component';
import { MenuComponent } from './components/menu/menu.component';
import { FileComponent } from './components/menu/components/file/file.component';
import { ProfiloComponent } from './components/menu/components/profilo/profilo.component';
import { ProgettoComponent } from './components/menu/components/progetto/progetto.component';
import { ModificaComponent } from './components/menu/components/modifica/modifica.component';
import { TemplateComponent } from './components/menu/components/template/template.component';
import { LayerComponent } from './components/menu/components/layer/layer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EditorComponent } from './components/editor/editor.component';
import { ActivityFrameComponent } from './components/activity-frame/activity-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    JointComponent,
    MenuComponent,
    FileComponent,
    ProfiloComponent,
    ProgettoComponent,
    ModificaComponent,
    TemplateComponent,
    LayerComponent,
    ToolbarComponent,
    EditorComponent,
    ActivityFrameComponent
  ],
  imports: [
    BrowserModule,
    [FlexLayoutModule],
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
