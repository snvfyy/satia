package com.luki.satia;

import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

class Download extends AsyncTask<String, Void, String> {


    Context context;
    String urlDownload;

    public Download(Context context, String url) {
        this.context = context;
        this.urlDownload = url;
    }

    protected void onPreExecute() {

        Log.v("DOWNLOAD", "Wait for downloading url : " + urlDownload);
    }

    protected String doInBackground(String... params) {
        try {
            //URL url = new URL("http://www.mediacollege.com/downloads/sound-effects/urban/factory/Factory_External_01.mp3");
            URL url = new URL(urlDownload);

            Log.w("DOWNLOAD", "URL TO CALL : " + url.toString());
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            //set up some things on the connection
            urlConnection.setRequestMethod("GET");
            urlConnection.setDoOutput(true);
            urlConnection.connect();


            InputStream inputStream = urlConnection.getInputStream();

            //this is the total size of the file
            int totalSize = urlConnection.getContentLength();
            //variable to store total downloaded bytes
            int downloadedSize = 0;

            //create a buffer...
            byte[] buffer = new byte[1024];
            int bufferLength = 0; //used to store a temporary size of the buffer
            StringBuilder g=new StringBuilder();
            //now, read through the input buffer and write the contents to the file
            while ((bufferLength = inputStream.read(buffer)) > 0) {

                g.append(buffer);

                downloadedSize += bufferLength;

                Log.w("DOWNLOAD", "progress " + downloadedSize + " / " + totalSize);

            }


            Log.w("DOWNLOAD", "progress g");
            //catch some possible errors...
        } catch (MalformedURLException e) {
            Log.e("DOWNLOAD", "ERROR : " + e);
        } catch (IOException e) {
            Log.e("DOWNLOAD", "ERROR : " + e);
        }
        return "done";
    }

    private void publishProgress(int i) {
        Log.v("DOWNLOAD", "PROGRESS ... " + i);
    }

    protected void onPostExecute(String result) {
        if (result.equals("done"))
            Log.i("download", "done");
    }
}