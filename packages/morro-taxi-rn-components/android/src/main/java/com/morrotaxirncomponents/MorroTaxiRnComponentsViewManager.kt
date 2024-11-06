package com.morrotaxirncomponents

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.MorroTaxiRnComponentsViewManagerInterface
import com.facebook.react.viewmanagers.MorroTaxiRnComponentsViewManagerDelegate

@ReactModule(name = MorroTaxiRnComponentsViewManager.NAME)
class MorroTaxiRnComponentsViewManager : SimpleViewManager<MorroTaxiRnComponentsView>(),
  MorroTaxiRnComponentsViewManagerInterface<MorroTaxiRnComponentsView> {
  private val mDelegate: ViewManagerDelegate<MorroTaxiRnComponentsView>

  init {
    mDelegate = MorroTaxiRnComponentsViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<MorroTaxiRnComponentsView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): MorroTaxiRnComponentsView {
    return MorroTaxiRnComponentsView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: MorroTaxiRnComponentsView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "MorroTaxiRnComponentsView"
  }
}
